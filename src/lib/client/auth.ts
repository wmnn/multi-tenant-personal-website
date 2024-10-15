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
    console.log('First attempt.')
    const res = await operation();

    // Successfull fetch
    if (res.status !== 401) {
        return res;
    }

    // ----- Trying to retrieve new access token -----
    console.log('Refreshing access token')
    const refresh = await (await fetch('/refresh')).json()

    // Couldn't retrieve new access token
    if (refresh.status !== 200) {
        window.location.href = '/'
        return;
    }

    // ----- Fetch the second time -----
    console.log('Second attempt.')
    const res2 = await operation();

    // Successfull second fetch
    if (res2.status !== 401) {
        return res2;
    } 

    // Second fetch failed
    console.log('Second attempt failed.');
    window.location.href = '/'
    
}