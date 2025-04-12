import {useStore} from "vuex";
import {LoginUserVO} from "../../generated";
import {ref} from "vue";

// 定义WebSocketClient类
export class WebSocketClient {
    private url: string;
    private socket: WebSocket | null;
    private reconnectInterval: number;
    private maxReconnectAttempts: number;
    private reconnectAttempts: number;
    private heartbeatInterval: NodeJS.Timeout | null;

    constructor(url: string) {
        this.url = url;
        this.socket = null;
        this.reconnectInterval = 5000;
        this.maxReconnectAttempts = 5;
        this.reconnectAttempts = 0;
        this.heartbeatInterval = null;
        this.connect();
    }

    private connect(): void {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }

    private onOpen(event: Event): void {
        console.log('WebSocket连接已打开');
        this.reconnectAttempts = 0;
        this.onMessageReceived({type: 'connection_opened', data: {}});
        this.heartbeatInterval = setInterval(() => {
            this.sendMessage({activity: 'heartbeat', data: {}});
        }, 60000);
    }

    private onMessage(event: MessageEvent): void {
        try {
            console.log(event.data);
            const data = JSON.parse(event.data);
            this.onMessageReceived(data);
        } catch (error) {
            console.error('解析消息失败:', error);
            this.onMessageReceived({type: 'parse_error', data: event.data});
        }
    }

    private onClose(event: CloseEvent): void {
        console.log('WebSocket连接已关闭', event);
        this.onConnectionClosed(event);
        // if (this.reconnectAttempts < this.maxReconnectAttempts) {
        //     this.reconnectAttempts++;
        //     setTimeout(() => {
        //         this.connect();
        //     }, this.reconnectInterval);
        // } else {
        //     console.log('达到最大重连次数，不再重连');
        // }
    }

    private onError(event: Event): void {
        console.error('WebSocket连接错误', event);
        this.onConnectionError(event);
    }

    private sendMessage(message: any): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            try {
                const data = JSON.stringify(message);
                this.socket.send(data);
                this.onMessageSent(message);
            } catch (error: any) {
                console.error('发送消息失败:', error);
                this.onSendMessageError(error);
            }
        } else {
            console.error('WebSocket连接未打开，无法发送消息');
            this.onSendMessageError(new Error('WebSocket连接未打开'));
        }
    }

    public close(): void {
        if (this.socket) {
            this.socket.close();
            wsClient.value = null;
            // 移除定时器
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
                this.heartbeatInterval = null;
            }
        }
    }

    protected onMessageReceived(message: any): void {
        console.log('收到消息:', message);
    }

    protected onMessageSent(message: any): void {
        console.log('发送消息:', message);
    }

    protected onConnectionClosed(event: CloseEvent): void {
        console.log('连接关闭:', event);
    }

    protected onConnectionError(event: Event): void {
        console.error('连接错误:', event);
    }

    protected onSendMessageError(error: Error): void {
        console.error('发送消息错误:', error);
    }
}

// 定义useSocket函数
export const wsClient = ref<WebSocketClient | null>(null);

export const useSocket = (loginUser: LoginUserVO) => {
    if (!loginUser) {
        return null;
    }

    if (wsClient.value) {
        return wsClient;
    }

    wsClient.value = new WebSocketClient(`ws://localhost:8101/api/ws/judge/${loginUser.id}`);
    return wsClient;
};