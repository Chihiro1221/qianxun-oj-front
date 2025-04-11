export function convertKBToMB(kb:number) {
    return kb / 1024;
}

export const statusColor = {
    Accepted: 'text-green-700',
    Finished: 'text-green-700',
    Uploading: 'text-gray-500',
    Running: 'text-blue-700',
    Pending: 'text-blue-700',
};
