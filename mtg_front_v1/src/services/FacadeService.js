import DeckService from "@/services/DeckService";
import UserService from "@/services/UserService";
import CardService from "@/services/CardService";

class FacadeService{
    deckService = DeckService;
    userService = UserService;
    cardService = CardService;


}

export default new FacadeService();