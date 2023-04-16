import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CoreButton = ({label, onClick, disabled=false, icon=null}) => {
    return <button disabled={disabled} className="insights-core-button" onClick={onClick} >
        {icon ? <><FontAwesomeIcon icon={icon}/>&nbsp;</> : ''}{label}
    </button>;
}

export default CoreButton;