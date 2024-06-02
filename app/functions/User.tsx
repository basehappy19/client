export const fetchUserData = async (userId,token) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user/list", {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "auth": token
        },
        body: JSON.stringify({userId:userId})
    });
    return response.json();
};

export const AddUser = async (data,token) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user", {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "auth": token
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to AddUser');
        }

        return await response.json();
    } catch (error) {
        console.error('Error AddUser:', error);
        throw error;
    }
};

export const editUser = async (token,id:number,data) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user/"+id, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
                "auth": token
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to EditUser');
        }

        return await response.json();
    } catch (error) {
        console.error('Error EditUser:', error);
        throw error;
    }
};

export const removeUser = async (userId,token,id:number) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user/"+id, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "auth": token
            },
            body: JSON.stringify({userId: userId})
        });
        if (!response.ok) {
            throw new Error('Failed to RemoveUser');
        }

        return await response.json();
    } catch (error) {
        console.error('Error RemoveUser:', error);
        throw error;
    }
};

