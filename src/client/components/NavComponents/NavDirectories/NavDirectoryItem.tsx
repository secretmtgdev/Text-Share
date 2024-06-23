/**
 * Component to render a nav directory list item.
 * 
 * @verison 1.0.0
 * @author Michael Wilson
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import { INavDirectoryItem } from '../../../utils/Types';

import './NavDirectoryItem.css';

const NavDirectoryItem = ({ name, icon }: INavDirectoryItem) => {
    const { t } = useTranslation('directories/navDirectories');
    return (
        <li>
            <span><FontAwesomeIcon icon={icon} /></span>
            <span>{t(name)}</span>
        </li>
    );
};

export default NavDirectoryItem;
