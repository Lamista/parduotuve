class UserService {
    constructor() {
        this._currentUser = undefined;
        this._cartCount = 0;
    }
    getCurrentUser = () => {
        return this._currentUser;
    }

    getCartCount = () => {
        return this._cartCount;
    }

    setCurrentUser = (username) => {
        this._currentUser = username;
    }

    setCartCount = (count) => {
        this._cartCount = count;
    }

    updateCurrentUser = () => { }
    updateCartCount = () => { }

}

export default UserService;