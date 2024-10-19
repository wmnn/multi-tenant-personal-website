/**
 * This function calls the endpoint and on a not authorized fetch,
 * it tries to get a new access token and calling the endpoint again.
 * 
 * @param endpoint the endpoint that will be called
 * @returns a json response with data
 */
export async function fetchEndpoint(endpoint: string) {

    const operation = async () => {
        return await (await fetch(endpoint)).json();
    }

    // ----- Fetch first time -----
    const res = await operation();

    // Successfull fetch
    if (res.status !== 401) {
        return res;
    }

    // ----- Trying to retrieve new access token -----
    const refresh = await (await fetch('/api/refresh')).json()

    // Couldn't retrieve new access token
    if (refresh.status !== 200) {
        window.location.href = '/'
        return;
    }

    // ----- Fetch the second time -----
    const res2 = await operation();

    // Successfull second fetch
    if (res2.status !== 401) {
        return res2;
    } 

    // Second fetch failed
    window.location.href = '/'
    
}

export async function request(endpoint: string, options?: RequestInit) {

    const operation = async () => {
        return await (await fetch(endpoint, options)).json();
    }

    // ----- Fetch first time -----
    const res = await operation();

    console.log('First attempt ' + JSON.stringify(res));

    // Successfull fetch
    if (res.status !== 401) {
        return res;
    }

    // ----- Trying to retrieve new access token -----
    console.log('Trying to refresh access token')
    await new Promise(resolve => setTimeout(resolve, 50))
    const refresh = await (await fetch('/api/refresh')).json()
    
    console.log('Refresh response ' + JSON.stringify(refresh));

    // Couldn't retrieve new access token
    if (refresh.status !== 200) {
        window.location.href = '/'
        return;
    }

    // ----- Fetch the second time -----
    const res2 = await operation();

    console.log('Second attempt ' + JSON.stringify(res2));

    // Successfull second fetch
    if (res2.status !== 401) {
        return res2;
    } 

    // Second fetch failed
    window.location.href = '/'

}