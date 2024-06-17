import { faClock, faCloud, faPeopleGroup, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { INavDirectoryItem } from "./Types";

export const mapStateToProps = (state: any) => {
    return {
        loginState: state.loginState,
        signupState: state.signupState
    };
};

export const navDirectories: INavDirectoryItem[] = [
    {
        name: 'My files',
        icon: faCloud
    },
    {
        name: 'Shared with me',
        icon: faPeopleGroup
    },
    {
        name: 'Recent',
        icon: faClock
    },
    {
        name: 'Favorites',
        icon: faStar
    },
    {
        name: 'Trash',
        icon: faTrash
    }
]