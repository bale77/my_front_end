module.exports = (goodUsers) =>{
    return (testUsers) => {
        return testUsers.every(tUser => {
            return goodUsers.some(gUser =>{
                return tUser.id === gUser.id;
            })
        })
    }
}