const create = async (user) => {
    try{
        let response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json();
    } catch(err){
        console.log('error on create: ' + err)
    }
}


const list = async (signal) => {
    console.log('list called')
    try{
        let response = await fetch('/api/users',
         { method: 'GET',
          signal: signal})
        console.log('list step two')
        return await response.json()

    } catch(err){
        console.log('an error occured at list: ', err)
    }
}


const read = async (params, credentials, signal) => {
    try{
    let response = await fetch('/api/users/' + params.userId, {
        method: 'GET',
        signal,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    })
    return await response.json();
        } catch(err){
        console.log('error on read: ' + err)
        }
    }


const update = async (params, credentials, user) => {
    try{
        let response = await fetch('/api/users/' + params.userId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t 
        },
        body: user
    })
    return await response.json();
} catch (err){
        console.log('error on update: ' + err)
}}


const remove = async (params, credentials) => {
    try{
        let response = await fetch('/api/users/' + params.userId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    })
        return await response.json()
    }catch (err){
        console.log('There was an error in remove: ' + err);
    };
}

export { create, list, read, update, remove }
