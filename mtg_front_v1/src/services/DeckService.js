import http from "@/services/api_connections/MtgCollectionAPIConnection";

class DeckService {
    getAll(){
        return http.get("/deck/")
    }
    getAllAsList(){
        return http.get("/deck/aslist")
    }
    get(id){
        return http.get("/deck/"+id)
    }
    create(data){
        return http.post("/deck/",data)
    }
    update(id, data){
        return http.put("/deck/"+id, data)
    }
    delete(id){
        return http.delete("/deck/"+id);
    }
}
export default new DeckService();