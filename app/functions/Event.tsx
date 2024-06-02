export const event = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/event",{ next: { revalidate: 1 } });
    return response.json();
};

export const eventByUser = async (data:number ,userId: string, token:string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/event/u/"+userId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "auth": token
        },
        body: JSON.stringify({userId:data})
    });
    return response.json();
};

export const AddEvent = async (data,token) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/event", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth": token
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to AddEvent');
        }

        return await response.json();
    } catch (error) {
        console.error('Add AddEvent:', error);
        throw error;
    }
};

export const EditEvent = async (data,eventId,token) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/event/e/"+eventId, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
                "auth": token
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to EditEvent');
        }

        return await response.json();
    } catch (error) {
        console.error('Edit EditEvent:', error);
        throw error;
    }
};

export const eventById = async (eventId: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/event/d/"+eventId,{ next: { revalidate: 1 } });
    return response.json();
};

