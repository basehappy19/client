export const Attendant = async (eventId: string, userId: number) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/attendant/"+eventId, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ userId: userId })
        });
        if (!response.ok) {
            throw new Error('Failed to Attendant');
        }

        return await response.json();
    } catch (error) {
        console.error('Error Attendant:', error);
        throw error;
    }
};

