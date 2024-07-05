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
        icon: faCloud,
        uuid: '9d59c44e-2f20-4b63-8490-fc1b6c363bf7'
    },
    {
        name: 'Shared with Me',
        icon: faPeopleGroup,
        uuid: '390e0939-fab3-4202-b49a-6e0d5fd15c28'
    },
    {
        name: 'Recent',
        icon: faClock,
        uuid: '87fa665f-74fa-4046-ad08-fa27c0cd5267'
    },
    {
        name: 'Favorites',
        icon: faStar,
        uuid: '46ccfbd3-07ca-4142-a331-67fe4f89d3d0'
    },
    {
        name: 'Trash',
        icon: faTrash,
        uuid: '8e44c475-8baf-4f4e-b88f-9cc0c5ad2ba0'
    }
];
