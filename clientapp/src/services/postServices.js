export const createPost = async (data) => {
    const bodyData = JSON.stringify({
        postTitle: data.postTitle,
        postTags: data.postTags,
        postBody: data.postBody,
        attachmentDto: data.attachmentType? {
            attachmentType: data.attachmentType,
            attachmentLink: data.attachmentLink,
        }: null,
        allowMultipleResponses: data.allowMultipleResponses,
        formSendOff: data.formSendOff,
    })
    
    const response = await fetch("./api/post/Create",{
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: bodyData,
    });

    return response;
}