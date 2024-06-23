/**
 * Renders text content from the database.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React from 'react';
import { connect } from 'react-redux';

import { mapStateToProps } from '../../utils/Constants';
import { useAppSelector } from '../../redux/hooks';

import './ContentRenderer.css';

const ContentRenderer = () => {
    const fileState = useAppSelector(state => state.fileState);
    
    return (
        <div id='renderer-container' className='flex-column-container'>
            <label htmlFor='passage'>Title: {fileState.selectedFile.name}</label>
            <br />
            <textarea id='passage' name='passage'></textarea>
        </div>
    )
}

export default connect(mapStateToProps)(ContentRenderer);
