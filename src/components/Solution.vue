<template>
  <div v-if="solutionTabStatus == 'list'"
       class="solution-container border-b border-x-0 border-t-0 border-solid border-gray-200  ">
    <a-button type="primary" status="success" @click="handleClick" class="ml-4">
      <template #icon>
        <icon-edit/>
      </template>
      写题解
    </a-button>
    <!--  创建题解表单  -->
    <a-modal v-model:visible="visible" width="auto">
      <template #title>
        创建题解
      </template>
      <a-form :model="form" label-align="left" layout="vertical" class="!w-[60vw]">
        <a-form-item field="title" label="标题" class="!w-1/2">
          <a-input v-model="form.title" placeholder="请输入标题"/>
        </a-form-item>
        <a-form-item field="content" label="题目内容">
          <MdEditor class="w-full" :value="form.content" :handle-change="onContentChange"/>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button type="primary" :loading="isLoading" @click="handleOk">创建</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </template>
    </a-modal>
    <a-divider/>
    <div v-if="dataList.length != 0"
         class="mt-4 solution-item px-4 py-4 text-gray-600 border-b border-solid border-gray-200 border-x-0 border-t-0"
         v-for="item of dataList" :key="item?.id">
      <div class=" gap-6 flex items-center">
        <MyAvatar :url="item.userVO?.userAvatar" class="cursor-pointer"/>
        <div class="flex flex-col items-center">
          <span class="text-lg">{{ item.upvoteCount }}</span>
          <span class="text-xs">支持</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-lg">{{ item.viewCount }}</span>
          <span class="text-xs">浏览</span>
        </div>
        <div class="text-xl sys-text"
             @click="handleClickItem(item.id!)">
          {{ item.title }}
        </div>
      </div>
      <div class="flex justify-end items-center">
        <span
            class="sys-text">{{
            item.userVO?.userName
          }}&nbsp;</span>
        <span> 创建于 {{ dayjs(item.createTime).format("YYYY-MM-DD HH:mm") }}</span>
      </div>
    </div>
    <a-empty v-else description="暂无题解，快来发表你的第一篇吧！"/>
  </div>
  <div class="solution-show" v-else>
    <a-card :header-style="{ 'background-color': '#f2f3f5' }">
      <template #title>
        <div class="flex items-center justify-between">
          <div
              class="inline-flex items-center cursor-pointer text-gray-400 hover:text-gray-700 text-sm duration-200"
              @click="solutionTabStatus = 'list'"
          >
            <icon-import size="20px"/>
            返回
          </div>
        </div>
      </template>
      <div class="solution-show" v-if="currentSolution">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl">{{ currentSolution?.title }}</div>
            <div class="flex items-center mt-2 text-gray-400">
              <span class="flex items-center">作者：<MyAvatar :size="20"
                                                             :url="currentSolution?.userVO?.userAvatar"/></span>
              <span class="sys-text ml-2">{{ currentSolution?.userVO?.userName }}，</span>
              <span>{{ dayjs(currentSolution?.createTime).format("YYYY-MM-DD HH:mm") }}，</span>
              <span>阅读：{{ currentSolution?.viewCount }}</span>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center">
              <icon-thumb-up v-if="!isLiked" class="cursor-pointer" :size="30" @click="handleLike"/>
              <icon-thumb-up-fill v-else class="cursor-pointer" :size="30" @click="handleUnLike"/>
              <span>{{ currentSolution?.upvoteCount }}</span>
            </div>
            <div class="flex items-center">
              <icon-star v-if="!isFavorite" class="cursor-pointer" :size="30" @click="handleFavorite"/>
              <icon-star-fill v-else class="cursor-pointer" :size="30" @click="handleUnFavorite"/>
              <span>{{ currentSolution?.favoriteCount }}</span>
            </div>
          </div>
        </div>
        <a-divider/>
        <MdViewer :value="currentSolution?.content"/>
      </div>
    </a-card>
    <!--评论模块-->
    <a-card class="mt-4 !text-gray-900">
      <div class="text-lg">{{ commentTotal }} 条评论</div>
      <div class="flex items-center gap-6 mt-4">
        <MyAvatar :url="store.state.user?.loginUser?.userAvatar"/>
        <a-textarea placeholder="在这里写评论..." v-model="commentContent" class="min-h-[60px]"/>
      </div>
      <div class="flex justify-end mt-2">
        <a-button type="primary" @click="submitComment(undefined)">提交评论</a-button>
      </div>
      <a-divider/>

      <a-comment
          class="border-b border-solid border-gray-300 border-x-0 border-t-0"
          v-for="comment of commentList"
          :key="comment.id"
          align="right"
          :content="comment.content"
      >
        <template #avatar>
          <MyAvatar :url="comment.userVO?.userAvatar"/>
        </template>
        <template #author>
          <div class="flex items-center">
            <span class="sys-text">{{ comment.userVO?.userName }}</span>
            <span class="ml-2 text-[13px] text-[#999]">{{ dayjs(comment.createTime).fromNow() }}</span>
            <span class="action ml-6 text-[13px] text-[#999] cursor-pointer hover:text-blue-500 hover:underline"
                  @click="comment.isShowReplyBtn = !comment.isShowReplyBtn">{{
                comment.isShowReplyBtn ? "取消" : "回复"
              }} </span>
            <a-popconfirm content="确认删除这条评论吗？" @ok="handleDeleteComment(comment.id!)">
              <icon-delete v-if="comment.userId == store.state.user?.loginUser?.id || store.state.user.isAdmin"
                           size="18"
                           class="hover:text-blue-500 cursor-pointer ml-4"/>
            </a-popconfirm>
          </div>
        </template>
        <!--回复框-->
        <!--           enter-active-class="animate__animated animate__zoomInLeft"
                    leave-active-class="animate__animated animate__zoomOutRight"-->
        <Transition name="fade">
          <a-comment
              v-if="comment.isShowReplyBtn"
              align="right"
          >
            <template #actions>
              <a-button key="1" type="primary"
                        @click="submitComment(comment.id!, comment.userId, comment.replyContent)">提交评论
              </a-button>
            </template>
            <template #content>
              <a-textarea placeholder="在这里写评论..." v-model="comment.replyContent" class="min-h-[60px]"/>
            </template>
          </a-comment>
        </Transition>
        <!--子评论-->
        <a-comment
            v-for="subComment of comment.replies"
            :key="subComment.id"
            align="right"
            :content="subComment.content"
        >
          <template #avatar>
            <MyAvatar :url="subComment.userVO?.userAvatar"/>
          </template>
          <template #author>
            <div>
              <span class="sys-text">{{ subComment.userVO?.userName }}</span>
              <span class="ml-2 text-[13px]">{{ dayjs(subComment.createTime).fromNow() }}</span>
              <span v-if="subComment.commentableId && subComment.replyUserId" class="text-[13px]">
                回复了 <span class="sys-text">{{ subComment.replyUserVO?.userName }}的评论</span>
              </span>
              <span class="action ml-6 text-[13px] text-[#999] cursor-pointer hover:text-blue-500 hover:underline"
                    @click="subComment.isShowReplyBtn = !subComment.isShowReplyBtn">{{
                  subComment.isShowReplyBtn ? "取消" : "回复"
                }} </span>
              <icon-delete v-if="subComment.userId == store.state.user?.loginUser?.id || store.state.user.isAdmin"
                           size="18"
                           class="hover:text-blue-500 cursor-pointer ml-4"/>
            </div>
          </template>
          <!--回复框-->
          <Transition name="fade">
            <a-comment
                v-if="subComment.isShowReplyBtn"
                align="right"
            >
              <template #actions>
                <a-button key="1" type="primary"
                          @click="submitComment(comment.id!, subComment.userId, subComment.replyContent)">提交评论
                </a-button>
              </template>
              <template #content>
                <a-textarea placeholder="在这里写评论..." v-model="subComment.replyContent" class="min-h-[60px]"/>
              </template>
            </a-comment>
          </Transition>
        </a-comment>
      </a-comment>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {editor} from "monaco-editor";
import {defineProps, onMounted, reactive, ref, watch, withDefaults} from "vue";
import {CommentVO, QuestionQueryRequest, SolutionControllerService, SolutionVO} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import MyAvatar from "@/components/MyAvatar.vue";
import dayjs from "dayjs";
import MdViewer from "@/components/MdViewer.vue";
import MdEditor from "@/components/MdEditor.vue";
import {CommentControllerService} from "../../generated/services/CommentControllerService";
import {useStore} from "vuex";

/**
 * 定义组件属性类型
 */
interface Props {
  questionId: number | undefined;
  tabValue?: string;
}

const props = withDefaults(defineProps<Props>(), {});
const solutionTabStatus = ref('list');
const dataList = ref<SolutionVO[]>([]);
const total = ref(0);
const currentSolution = ref<SolutionVO>()
const isLiked = ref<boolean>(false)
const isFavorite = ref<boolean>(false)
const visible = ref(false);
const commentList = ref<CommentVO[]>()
const commentTotal = ref(0);
const store = useStore();
const commentContent = ref("");

const isLoading = ref(false)
const form = reactive({
  questionId: props.questionId,
  content: "",
  title: ""
})

watch(() => props.questionId, (newValue) => {
  form.questionId = newValue;
});

const onContentChange = (value: string) => {
  form.content = value;
};

const handleClick = () => {
  visible.value = true;
};
/**
 * 添加题解
 */
const handleOk = async () => {
  isLoading.value = true;
  console.log(form)
  const res = await SolutionControllerService.addSolutionUsingPost(form);
  if (res.code !== 0) {
    message.error('添加失败，' + res.message);
  }
  visible.value = false;
  isLoading.value = false;
  form.title = "";
  form.content = "";
  loadSolutionRecords();
};
const handleCancel = () => {
  visible.value = false;
}

const handleDeleteComment = async (id: number) => {
  const res = await CommentControllerService.deleteCommentUsingPost({id});
  if (res.code === 0) {
    message.success("删除成功");
    await loadCommentRecords()
  } else {
    message.error('删除评论失败，' + res.message);
  }
}

/**
 * 提交评论
 * @param e
 * @param commentableId
 * @param replyUserId
 */
const submitComment = async (commentableId?: number, replyUserId?: number, replyContent?: string) => {
  const res = await CommentControllerService.addCommentUsingPost({
    targetId: currentSolution.value?.id,
    commentableType: "solution",
    content: replyContent == '' || replyContent === undefined ? commentContent.value : replyContent,
    commentableId: commentableId !== undefined ? commentableId : null,
    replyUserId: replyUserId !== undefined ? replyUserId : null
  });
  if (res.code === 0) {
    if (replyContent == '' || replyContent === undefined) {
      commentContent.value = "";
    }
  } else {
    message.error('创建评论失败，' + res.message);
  }

  loadCommentRecords()
}

const searchParams = ref<QuestionQueryRequest>({
  pageSize: 10,
  current: 1,
});

const commentSearchParams = ref<QuestionQueryRequest>({
  pageSize: 10,
  current: 1,
});

watch(
    () => props.tabValue,
    () => {
      if (props.tabValue === 'solution-records') {
        loadSolutionRecords();
      }
    }
);

/**
 * 获取题解数据
 */
const loadSolutionRecords = async () => {
  const res = await SolutionControllerService.listSolutionVoByPageUsingPost({
    ...searchParams.value,
    questionId: props.questionId,
    sortField: 'createTime',
    sortOrder: 'descend',
  });
  console.log(res.data.records)
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = parseInt(res.data.total);
  } else {
    message.error('加载失败，' + res.message);
  }
};

/**
 * 获取题解评论数据
 */
const loadCommentRecords = async () => {
  const res = await CommentControllerService.listCommentVoByPageUsingPost({
    ...commentSearchParams.value,
    targetId: currentSolution.value?.id,
    sortField: 'createTime',
    sortOrder: 'descend',
  });
  console.log(res.data.records)
  if (res.code === 0) {
    commentList.value = res.data.records;
    commentList.value?.forEach(comment => {
      comment.isShowReplyBtn = false;
      comment.replyContent = "";
      comment.replies?.forEach(subComment => {
        subComment.isShowReplyBtn = false;
        subComment.replyContent = "";
      })
    })
    commentTotal.value = parseInt(res.data.total);
  } else {
    message.error('评论加载失败，' + res.message);
  }
};

/**
 * 获取 对应id 的题解详细数据
 * @param id
 */
const handleClickItem = async (id: number) => {
  // 更新浏览量
  await SolutionControllerService.updateViewCountUsingPost({id});
  store.state.user?.loginUser && await loadIsLiked(id);
  store.state.user?.loginUser && await loadIsFavorite(id)
  await loadItemData(id);
  solutionTabStatus.value = 'item';
}

const loadItemData = async (id: number) => {
  const res = await SolutionControllerService.getSolutionVoByIdUsingGet(id);
  if (res.code === 0) {
    currentSolution.value = res.data;
  } else {
    message.error('加载失败，' + res.message);
  }

  await loadCommentRecords();
}

/**
 * 加载是否点赞
 * @param id
 */
const loadIsLiked = async (id: number) => {
  const res = await SolutionControllerService.isLikedUsingGet(id);
  isLiked.value = res.data!;
}

/**
 * 加载是否收藏
 * @param id
 */
const loadIsFavorite = async (id: number) => {
  const res = await SolutionControllerService.isFavoriteUsingGet(id);
  isFavorite.value = res.data!;
}

const handleLike = async () => {
  const res = await SolutionControllerService.likeUsingPost({id: currentSolution.value?.id});
  await loadIsLiked(currentSolution.value?.id!)
  await loadItemData(currentSolution.value?.id!)
}

const handleUnLike = async () => {
  const res = await SolutionControllerService.unlikeUsingPost({id: currentSolution.value?.id});
  await loadIsLiked(currentSolution.value?.id!)
  await loadItemData(currentSolution.value?.id!)
}

const handleFavorite = async () => {
  const res = await SolutionControllerService.addFavoriteUsingPost({id: currentSolution.value?.id});
  await loadIsFavorite(currentSolution.value?.id!)
  await loadItemData(currentSolution.value?.id!)
}

const handleUnFavorite = async () => {
  const res = await SolutionControllerService.unFavoriteUsingPost({id: currentSolution.value?.id});
  await loadIsFavorite(currentSolution.value?.id!)
  await loadItemData(currentSolution.value?.id!)
}

onMounted(() => {
  loadSolutionRecords();
})

</script>

<style scoped>
::v-deep(.arco-comment-inner-comment) {
  margin-top: 10px !important;
}

::v-deep(.arco-comment:not(:first-of-type)) {
  margin-top: 10px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, max-height 0.5s;
  max-height: 150px; /* 设置最大高度 */
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

</style>
