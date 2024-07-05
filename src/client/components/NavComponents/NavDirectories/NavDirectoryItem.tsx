/**
 * Component to render a nav directory list item.
 * 
 * @verison 1.0.0
 * @author Michael Wilson
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import './NavDirectoryItem.css';

export interface NavDirectoryItemProps {
    name: string,
    icon: IconDefinition;
}

const NavDirectoryItem = ({ name, icon }: NavDirectoryItemProps) => {
    const { t } = useTranslation('directories/navDirectories');
    return (
        <li>
            <span><FontAwesomeIcon icon={icon} /></span>
            <span>{t(name)}</span>
        </li>
    );
};

export default NavDirectoryItem;
