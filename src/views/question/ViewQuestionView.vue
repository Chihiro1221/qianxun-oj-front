<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <div class="shadow rounded overflow-hidden">
          <a-tabs default-active-key="question" v-model="tabValue" size="large" @change="onTabChange"
                  class="bg-white">
            <a-tab-pane key="question">
              <template #title>
                <icon-file/>
                题目
              </template>
              <Question :question="question"/>
            </a-tab-pane>
            <a-tab-pane v-if="store.state.user.loginUser" key="submit-records">
              <template #title>
                <icon-unordered-list/>
                提交记录
              </template>
              <Submit :question-id="question?.id!" :tab-value="tabValue"/>
            </a-tab-pane>
            <a-tab-pane key="solution-records" title="题解">
              <Solution :question-id="question?.id" :tab-value="tabValue"/>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :md="12" :xs="24">
        <div class="shadow rounded overflow-hidden">
          <a-form :model="form" layout="inline" class="flex items-center justify-end bg-[#f2f3f5] py-2 shadow"
                  style="border-bottom: 1px solid #bdbdbd">
            <a-form-item field="language" style="min-width: 240px; margin: 0px">
              <a-select v-model="form.language" :style="{ width: '220px', 'background-color': 'white' }"
                        placeholder="选择编程语言" class="mr-4" @change="handleLanguageChange">
                <a-option value="cpp">c++</a-option>
                <a-option>c</a-option>
                <a-option>java</a-option>
                <a-option>python</a-option>
                <a-option>python3</a-option>
                <a-option>javascript</a-option>
                <a-option>typescript</a-option>
                <a-option>ruby</a-option>
                <a-option>rust</a-option>
                <a-option>go</a-option>
              </a-select>
            </a-form-item>
            <div class="options">
              <icon-sync @click="form.source_code = ''" size="28px"
                         class="!text-[#95a5a6] mr-4 cursor-pointer hover:!text-blue-500"/>
              <icon-settings size="28px" class="!text-[#95a5a6] mr-4 cursor-pointer hover:!text-blue-500"/>
            </div>
          </a-form>
          <div class="bg-white">
            <CodeEditor :value="form.source_code as string" :language="form.language" :handle-change="changeCode"/>
            <a-divider :size="0"/>
            <div class="button-group px-2 pb-4">
              <a-button shape="round" class="debug h-[40px] w-[120px]" @click="doDebug" :disabled="isDisabled">
                <template #icon>
                  <icon-play-circle-fill/>
                </template>
                <template #default>调试代码</template>
              </a-button>
              <a-button shape="round" status="success" type="primary h-[40px] w-[120px]" @click="doSubmit"
                        :disabled="isDisabled">
                <template #icon>
                  <icon-upload/>
                </template>
                <template #default>提交答案</template>
              </a-button>
            </div>
          </div>
          <a-card v-show="menuStatus !== 'code'" :class="['mt-2']">
            <template #title>
              <div class="flex text-lg items-center">
                <div>代码提交状态：</div>
                <span
                    :class="['running mr-2', statusColor[finishedStatus] ? statusColor[finishedStatus] : 'text-red-700']">{{
                    finishedStatus
                  }}</span>
                <icon-refresh
                    v-if="['Uploading', 'Judging', 'Running', 'Pending'].includes(finishedStatus)"
                    :style="{ fontSize: '24px', color: 'rgb(74, 148, 209)' }"
                    spin
                />
              </div>
            </template>
            <template #extra>
              <icon-close style="color: black" class="cursor-pointer opacity-20 hover:opacity-100 font-bold" size="18px"
                          @click="menuStatus = 'code'"/>
            </template>
            <div v-show="menuStatus === 'debug'" class="p-4">
              <div class="input">
                <div class="mb-2">输入</div>
                <a-textarea v-model="form.stdin" :disabled="isDisabled" auto-size/>
              </div>
              <div class="output mt-4">
                <div class="mb-2">输出</div>
                <a-textarea v-model="debugForm.stdout" disabled auto-size/>
              </div>
              <div v-show="debugForm.time" class="exec_time mt-2">运行时间：{{ debugForm.time }}ms</div>
            </div>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, onMounted, onUnmounted, reactive, ref, watch, withDefaults} from 'vue';
import message from '@arco-design/web-vue/es/message';
import CodeEditor from '@/components/CodeEditor.vue';
import {wsClient} from '@/utils/webSocketClient';
import {QuestionControllerService, QuestionSubmitAddRequest, QuestionVO} from '../../../generated';
import {useStore} from 'vuex';
import {checkLogin} from '@/utils/checkLogin';
import {statusColor} from '../../utils';
import Solution from "@/components/Solution.vue";
import Submit from "@/components/Submit.vue";
import Question from "@/components/Question.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => '',
});
const tabValue = ref("question")
const store = useStore();

const debugForm = reactive({
  stdout: '',
  time: '',
  excepted_stdout: '',
});

const loginUser = computed(() => store.state.user.loginUser);
watch(wsClient, () => {
  if (wsClient.value != null) {
    wsClient.value.onMessageReceived = function (message: any) {
      if (message.activity == 'heartbeat') return;
      if (['Accepted', 'Finished'].includes(message.status)) {
        form.value.stdin = message.stdin;
        debugForm.stdout = message.stdout?.endsWith('\n') ? message.stdout.slice(0, -1) : message.stdout;
        debugForm.time = new String(parseFloat(message.time) * 1000).toString();
        // isTimeShow.value = true;
        // finishedStatus.value = message.status;
        // return;
      }
      if (message.compile_output && message.compile_output.length !== 0) {
        menuStatus.value = 'debug';
        debugForm.stdout = message.compile_output;
      }
      if (message.status === 'Wrong Answer') {
        menuStatus.value = 'debug';
        debugForm.stdout = message.user_stdout;
      }
      if (['Pending', 'Running'].includes(message.status)) {
        isDisabled.value = true;
      } else {
        isDisabled.value = false;
      }

      finishedStatus.value = message.status;
    };
  }
}, {deep: true, immediate: true})

/**
 * 禁用按钮
 */
const isDisabled = ref(false);
/**
 * 调试面板状态
 */
const menuStatus = ref('code');
/**
 * 是否执行完
 */
const finishedStatus = ref('');
const question = ref<QuestionVO>();
const onTabChange = (key: string) => {
  tabValue.value = key;
};

/**
 * 修改语言时触发
 * @param language
 */
const handleLanguageChange = (language: string) => {
  const data = localStorage.getItem(`${question.value?.id}-${form.value.language}`);
  if (data) {
    form.value.source_code = data
    return;
  }
  form.value.source_code = "";
}


const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(props.id as any);
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error('加载失败，' + res.message);
  }
};


const form = ref<QuestionSubmitAddRequest>({
  stdin: '',
  language: 'cpp',
  source_code: ''
});

/**
 * 调试代码
 */
const doDebug = async () => {
  if (!checkLogin(store)) return;
  if (!question.value?.id) {
    return;
  }
  // wsClient = useSocket(loginUser.value);
  isDisabled.value = true;
  menuStatus.value = 'debug';
  debugForm.time = '';
  finishedStatus.value = 'Uploading';
  console.log("test:")
  console.log(wsClient.value)
  wsClient.value?.sendMessage({...form.value, question_id: question.value.id, activity: 'problem_run_code'});
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!checkLogin(store)) return;
  if (!question.value?.id) {
    return;
  }
  // wsClient = useSocket(loginUser);
  isDisabled.value = true;
  menuStatus.value = 'submit';
  finishedStatus.value = 'Uploading';
  wsClient.value?.sendMessage({...form.value, question_id: question.value.id, activity: 'problem_submit_code'});
};

const handleBeforeUnload = (event) => {
  // 执行清理工作
  const settings = {language: form.value.language};
  localStorage.setItem(`${question.value?.id}-settings`, JSON.stringify(settings))
  localStorage.setItem(`${question.value?.id}-${form.value.language}`, form.value.source_code!)
};

/**
 * 页面加载时，请求数据
 */
onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload);

  await loadData();
  const settingsStr = localStorage.getItem(`${question.value?.id}-settings`);
  if (settingsStr) {
    const settings = JSON.parse(settingsStr);
    form.value.language = settings.language;
  }
  const data = localStorage.getItem(`${question.value?.id}-${form.value.language}`);
  if (data) {
    form.value.source_code = data
  }
});
onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});


const changeCode = (value: string) => {
  form.value.source_code = value;
};
</script>

<style scoped>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

::v-deep(.arco-descriptions-item-label) {
  padding-right: 5px !important;
}

.debug {
  margin-right: 20px;
}
</style>
