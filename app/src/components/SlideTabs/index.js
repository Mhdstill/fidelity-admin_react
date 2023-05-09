import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

function SlideTabs(props) {
   const { tabs, defaultActiveKey } = props;
   return (
      <Tabs defaultActiveKey={defaultActiveKey} className="fixed-tabs">
         {tabs.map(tab => (
            <Tab key={tab.id} eventKey={tab.id} title={tab.title}>
               <div className="content-padding">
                  {tab.content}
               </div>
            </Tab>
         ))}
      </Tabs>
   );
}

export default SlideTabs;