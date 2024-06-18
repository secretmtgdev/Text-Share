import { faClock, faCloud, faPeopleGroup, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { INavDirectoryItem } from "./Types";

export const mapStateToProps = (state: any) => {
    return {
        loginState: state.loginState,
        signupState: state.signupState,
        fileState: state.fileState
    };
};

export const navDirectories: INavDirectoryItem[] = [
    {
        name: 'My files',
        icon: faCloud
    },
    {
        name: 'Shared with Me',
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
];
