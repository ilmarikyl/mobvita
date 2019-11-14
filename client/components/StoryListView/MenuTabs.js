import React, { useEffect } from 'react'
import { Tab } from 'semantic-ui-react'
import StoryList from "Components/StoryListView/StoryList"
import HomeView from 'Components/StoryListView/HomeView'



const panes = [
    { menuItem: "Home", render: () => <Tab.Pane><HomeView/></Tab.Pane> },
    { menuItem: 'Library', render: () => <Tab.Pane><StoryList /></Tab.Pane> }
]

const Tabs = () => (
    <div>
        <Tab panes={panes} renderActiveOnly={true} defaultActiveIndex={1} />
    </div>
)

export default Tabs

