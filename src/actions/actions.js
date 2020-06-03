
const actions = {
    escFunction(event,history){
        if (event.keyCode === 27) {
            history.push('/home')
        }
    },
}


export default actions;