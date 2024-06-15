export const mapStateToProps = (state: any) => {
    return {
        loginState: state.loginState,
        signupState: state.signupState
    };
};