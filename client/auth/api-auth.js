import { response } from "express"

const signin = async (user) => {
    try{
        const response = await fetch('/api/auth/signin',
            {
                'method': 'POST',
                'headers': {
                    'accepts': 'text/javascript',
                    'content-type': 'text/javascript'
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
        console.log(err)
    }
}

export { signin, signout }
