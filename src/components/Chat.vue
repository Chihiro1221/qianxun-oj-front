<template>
  <div class="chat-container p-4 flex flex-col justify-between min-h-[65vh] rounded">
    <div class="list">
      <div class="item" v-for="(item, i) of list" :key="i">
        <a-comment author="deepseek" v-if="item.sender == 'ai'">
          <template #avatar>
            <a-avatar>
              <img alt="avatar" src="../assets/deepseek.png"/>
            </a-avatar>
          </template>
          <template #content>
            <icon-loading v-if="item.status == 'pending'"/>
            <div v-else>
              <div v-if="options.isThiking">
                <div>
                  <span
                      @click="item.isShowThink = !item.isShowThink"
                      class="px-3 py-[6px] inline-block bg-gray-100 text-xs rounded-lg hover:bg-gray-200 duration-300 cursor-pointer select-none"
                  >
                    <icon-command class="mr-2"/>
                    <span v-if="item.status === 'thinking'">思考中...</span>
                    <span v-else>已深度思考（用时 {{ item.thinkTime }} 秒） </span>
                    <span>
                      <icon-up v-if="item.isShowThink"/>
                      <icon-down v-else/>
                    </span>
                  </span>
                </div>
                <div v-show="item.isShowThink" class="text-gray-500 px-4 mt-2"
                     style="border-left: 1px solid rgba(0, 0, 0, 0.1)">
                  {{ item.thinking }}
                </div>
              </div>
              <a-divider style="margin: 10px 0"></a-divider>
              <!-- <h2>{{ item.status }} - {{ item.htmlContent }}</h2> -->
              <!-- <span v-html="item.status === 'done' ? item.htmlContent : md.render(item.rawContent)"></span> -->
              <span v-html="md.render(item.rawContent)"></span>
              <!-- {{ item.rawContent }} -->
            </div>
          </template>
        </a-comment>
        <a-comment class="current-user" :author="store.state.user?.loginUser.userName" v-else>
          <template #avatar>
            <MyAvatar :url="store.state.user?.loginUser.userAvatar"/>
          </template>
          <template #content>
            <div class="mt-[10px]">
              <span class="px-4 py-2 bg-blue-500 text-white rounded inline-block">
                {{ item.message }}
              </span>
            </div>
          </template>
        </a-comment>
      </div>
    </div>
    <div class="input gap-2 bg-gray-100 rounded-2xl border border-solid border-gray-200 p-4">
      <textarea
          v-model="form.message"
          ref="textareaRef"
          type="text"
          class="border-0 bg-gray-100 focus:outline-none w-full resize-none min-h-[40px]"
          placeholder="给 DeepSeek 发消息"
          @input="handleInput"
      />
      <div class="flex items-center justify-between">
        <a-tooltip content="先思考后回答，解决推理问题" mini position="lt">
          <div
              class="rounded-3xl py-1 px-2 cursor-pointer border border-solid duration-200 text-xs select-none"
              :class="[form.isThink ? 'bg-blue-200 text-blue-500 border-blue-300' : 'bg-white text-gray-900 border-gray-300']"
              @click="form.isThink = !form.isThink"
          >
            <icon-command/>
            深度思考
          </div>
        </a-tooltip>
        <div
            class="rounded-full bg-blue-500 p-2 text-white duration-200 hover:bg-blue-400 cursor-pointer"
            :class="[aiStatus !== 'done' ? 'bg-blue-400' : '']"
            @click="handleSend"
        >
          <icon-send/>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {useStore} from 'vuex';
import MyAvatar from './MyAvatar.vue';
import {fetchEventSource} from '@microsoft/fetch-event-source';
import markdownit from 'markdown-it';
import hljs from 'highlight.js'; // https://highlightjs.org
import MdKatex from '@vscode/markdown-it-katex';
import MdLinkAttributes from 'markdown-it-link-attributes';
import MdMermaid from 'mermaid-it-markdown';
import message from "@arco-design/web-vue/es/message";
import {checkLogin} from "@/utils/checkLogin";
import {OpenAPI} from "../../generated/question";

const handleInput = () => {
  if (textareaRef.value) {
    if (textareaRef.value.scrollHeight >= 200) {
      textareaRef.value.style['overflow-y'] = 'scroll';
      return;
    }
    textareaRef.value.style['overflow-y'] = 'hidden';
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
  }
};

onMounted(() => {
  handleInput();
});
const textareaRef = ref(null);

const md = markdownit({
  html: false, // 禁用 HTML 标签
  linkify: true,
  // typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' + hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true
        }).value + '</code></pre>';
      } catch (__) {
      }
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  },
});

md.use(MdLinkAttributes, {attrs: {target: '_blank', rel: 'noopener'}})
    .use(MdKatex)
    .use(MdMermaid);

interface Props {
  questionId: number;
}

const props = withDefaults(defineProps<Props>(), {});

const store = useStore();
const form = reactive({
  userId: store.state.user?.loginUser?.id,
  questionId: props.questionId,
  message: '',
  isThink: true,
});

const options = reactive({
  isThiking: true,
});

const list = ref<any>([]);
const aiStatus = ref('done');

const handleSend = async () => {
  if (!checkLogin(store)) return;
  if (aiStatus.value !== 'done') return;
  if (!form.message) return message.error("内容不能为空！")
  aiStatus.value = 'pending';
  list.value.push({
    sender: 'user',
    message: form.message,
  });
  const newMessage = [...list.value];
  const botMsg = reactive({
    sender: 'ai',
    rawContent: '',
    htmlContent: '',
    thinking: '',
    thinkTime: '',
    isShowThink: true,
    status: 'pending',
  });
  list.value.push(botMsg);

  const url = `${OpenAPI.BASE}/chat/stream`;
  let startTime;
  let endTime;
  await fetchEventSource(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
    onopen(response) {
      form.message = ''
    },
    onmessage(res) {
      const data = res.data.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
      if (data === '<think>') {
        startTime = Date.now();
        botMsg.status = 'thinking';
        aiStatus.value = 'thinking';
        return;
      }
      if (data === '</think>') {
        endTime = Date.now();
        botMsg.thinkTime = new String(Math.ceil((endTime - startTime!) / 1000)).toString();
        botMsg.status = 'replying';
        aiStatus.value = 'replying';
        return;
      }
      if (options.isThiking && botMsg.status === 'thinking') {
        botMsg.thinking += data;
      } else {
        botMsg.rawContent += data;
      }
      // list.value = [...newMessage, {...botMsg}];
    },
    onerror(err) {
      console.error('Connection error:', err);
      message.error("出错：" + err)
      // 处理其他错误逻辑
    },
    onclose() {
      aiStatus.value = 'done';
      // 最终渲染剩余内容
      botMsg.status = 'done';
    },
    openWhenHidden: true,
  }); // const res = await QuestionControllerService.chatStream(form);
};
//@import url(../assets/markdown.less);
</script>

<style scoped>


.current-user {
  flex-direction: row-reverse;
}

::v-deep(.current-user .arco-comment-inner) {
  text-align: right !important;
}

::v-deep(.current-user .arco-comment-avatar) {
  margin-left: 12px;
}
</style>
