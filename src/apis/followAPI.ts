import axiosClient from "./axiosClient"

class FollowAPI {
    HandleFollwer = async (
        url:string,
        data?:any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
        const response =  await axiosClient(`/follow${url}`,{
            method: method ?? 'get',
            data
        })
        return response;
    }
}

const followAPI = new FollowAPI()
export default followAPI