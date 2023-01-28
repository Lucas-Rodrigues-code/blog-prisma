export type createDataProp = {
    title: string,
    body: string,
    authorId: number;
    hashtag: string
}

export type updateDataPro = {
    title?: string,
    body?: string,
    authorId?: number
    published?: boolean
}