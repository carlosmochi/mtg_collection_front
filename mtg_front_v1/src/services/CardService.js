import http from "@/services/api_connections/MtgCollectionAPIConnection";

class CardService {
    getAll(){
        return http.get("/card/")
    }
    getAsList(){
        return http.get("card/aslist")
    }
    getByName(data){
        return http.get("card/name/"+data)
    }
    get(id){
        return http.get("/card/"+id)
    }
    getBanned(format){
        return http.get("/card/"+format)
    }
    create(data){
        return http.post("/card/",data)
    }
    bulkCreate(data){
        return http.post("/card/bulk",data)
    }
    update(id, data){
        return http.put("/card/"+id, data)
    }
    delete(id){
        return http.delete("/card/"+id);
    }
}
export default new CardService();