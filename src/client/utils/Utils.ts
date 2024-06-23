export const isValidEmail = (email: string) => {
    const pattern = /^[a-zA-Z]+([\.-_]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/
    return pattern.test(email);
}
