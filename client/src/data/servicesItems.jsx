import ServiceOne from "../components/svg/ServiceOne"
import ServiceTwo from "../components/svg/ServiceTwo"
import ServiceThree from "../components/svg/ServiceThree"
import ServiceFour from "../components/svg/ServiceFour"
import ServiceFive from "../components/svg/ServiceFive"
import ServiceSix from "../components/svg/ServiceSix"
import ServiceSeven from "../components/svg/ServiceSeven"

const servicesItems = [
    {id: 1, idTag: "serviceOne", icon: <ServiceOne />, titleKey: "services.0.title", contentKey: [{subTitleKey:'services.0.content.0.subTitle', subContentKey:'services.0.content.0.subContent'}, {subTitleKey:'services.0.content.1.subTitle', subContentKey:'services.0.content.1.subContent'}, {subTitleKey:'services.0.content.2.subTitle', subContentKey:'services.0.content.2.subContent'}],},
    {id: 2, idTag: "serviceTwo", icon: <ServiceTwo />, titleKey: "services.1.title", contentKey: [{subTitleKey:'services.1.content.0.subTitle', subContentKey:'services.1.content.0.subContent'}, {subTitleKey:'services.1.content.1.subTitle', subContentKey:'services.1.content.1.subContent'}],},
    {id: 3, idTag: "serviceThree", icon: <ServiceThree />, titleKey: "services.2.title", contentKey: [{subTitleKey:'services.2.content.0.subTitle', subContentKey:'services.2.content.0.subContent'}, {subTitleKey:'services.2.content.1.subTitle', subContentKey:'services.2.content.1.subContent'}]},
    {id: 4, idTag: "serviceFour", icon: <ServiceFour />, titleKey: "services.3.title", contentKey: [{subTitleKey:'services.3.content.0.subTitle', subContentKey:'services.3.content.0.subContent'}]},
    {id: 5, idTag: "serviceFive", icon: <ServiceFive />, titleKey: "services.4.title", contentKey: [{subTitleKey:'services.4.content.0.subTitle', subContentKey:'services.4.content.0.subContent'}]},
    {id: 6, idTag: "serviceSix", icon: <ServiceSix />, titleKey: "services.5.title", contentKey: [{subTitleKey:'services.5.content.0.subTitle', subContentKey:'services.5.content.0.subContent'}]},
    {id: 7, idTag: "serviceSeven", icon: <ServiceSeven />, titleKey: "services.6.title", contentKey: [{subTitleKey:'services.6.content.0.subTitle', subContentKey:'services.6.content.0.subContent'}]}
];

export default servicesItems