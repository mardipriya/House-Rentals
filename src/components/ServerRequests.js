const baseUrl = '';


const fetchComplaints = async () => {
    // Perform the API call to retrieve all complaints
    try {
        const response = await fetch(`${baseUrl}/api/getComplaints`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the retrieval was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const complaints = await response.json();
        return complaints;
    } catch (error) {
        console.error("Failed to fetch complaints:", error);
        return {
            status: "Failure",
            error: error.message
        };
    }
}


const fetchUserComplaints = async (userId) => {
    // Perform the API call to retrieve all complaints
    try {
        const response = await fetch(`${baseUrl}/api/getComplaints/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the retrieval was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const complaints = await response.json();
        return complaints;
    } catch (error) {
        console.error("Failed to fetch complaints:", error);
        return {
            status: "Failure",
            error: error.message
        };
    }
}

const addComplaint = async (userId, payload) => {
    // Perform the API call to add a new complaint
    try {
        const response = await fetch(`${baseUrl}/api/complaints/userId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check if the addition was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newComplaint = await response.json();
        return newComplaint;
    } catch (error) {
        console.error("Failed to add complaint:", error);
        return {
            status: "Failure",
            error: error.message
        };
    }
}



const updateComplaints = async (complaintId, payload) => {
    // Perform the API call to update the complaint on the server
    try {
        const response = await fetch(`${baseUrl}/api/complaints/${complaintId}`, {
            method: 'PATCH', // Using PATCH for partial update
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check if the update was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedComplaint = await response.json();
        return updatedComplaint;
    } catch (error) {
        console.error("Failed to update complaint:", error);
        return {
            status : "Failure",
            error : error.message
        }
        // Optionally handle the error, e.g., show an error message to the user
    }

}

