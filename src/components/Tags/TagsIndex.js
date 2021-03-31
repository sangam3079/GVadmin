import React from 'react'
import CustomLayout from 'components/CustomLayout/CustomLayout'
import Tags from './Tags'
import TagsGroup from './TagsGroup'


const TagsIndex = () => {
    return (
        <CustomLayout sidebarSelectionKey="tags">
            <div className="row">
                <div className="col-lg-6">
                    <Tags />
                </div>
                <div className="col-lg-6">
                    <TagsGroup />
                </div>
            </div>
        </CustomLayout>
    )
}

export default TagsIndex