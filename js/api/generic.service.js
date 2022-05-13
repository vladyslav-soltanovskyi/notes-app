const baseUrl = 'https://61d8e2cfe6744d0017ba8cdc.mockapi.io';

export const request = async ({ url = '', method = "GET", data = {} }) => {
    const withBody = method.toUpperCase() === "GET" ? {} : { body: JSON.stringify(data) }; 
    
    const response = await fetch(`${baseUrl}/${url}`, {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
        ...withBody
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
};  