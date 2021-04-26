

const signin = async (user) => {
    try{
        const response = await fetch('/auth/signin/',
            {
                'method': 'POST',
                'headers': {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(user)
            })
        return await response.json()
    } catch(err){
            console.log('an error occured: ', err)
        }

    }

const signout = async () => {
    try {
        let response = await fetch('/auth/signout', {'method': 'GET'})
        return await response.json()
    } catch (err) {
        console.log('an error occured in signout: ', err)
    }
}

export { signin, signout }
