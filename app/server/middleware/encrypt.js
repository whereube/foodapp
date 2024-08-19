import bcrypt from 'bcrypt';


const saltRounds = 10;

// Function to hash a password
export const hashPassword = async (plainPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
}

// Function to compare passwords
export const checkPassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw error;
    }
}