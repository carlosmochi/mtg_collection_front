import http from "@/services/api_connections/MtgCollectionAPIConnection";

class UserService {
    getAll(){
        return http.get("/user/")
    }
    get(id){
        return http.get("/user/"+id)
    }
    getAsList(){
        return http.get("/user/aslist")
    }
    getByName(name){
        return http.get("/user/name/"+name)
    }
    create(data){
        return http.post("/user/",data)
    }
    update(id, data){
        return http.put("/user/"+id, data)
    }
    delete(id){
        return http.delete("/user/"+id);
    }
}
export default new UserService();