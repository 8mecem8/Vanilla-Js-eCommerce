export const parseRequestUrl = () =>
{   
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");

    console.log(request)
    return{
        resource: request[1],
        id: request[2],
        verb: request[3],
    }

    
}