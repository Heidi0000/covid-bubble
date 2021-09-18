import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title,onAdd, showAdd}) => {
    const onClick = () => {
        console.log('Click')
    }

    return (
        <header className = 'header'>
            <h1>{title}</h1>
            <Button onClick = {onAdd} color={showAdd ? 'red' : 'green'}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string
}

const headingStyle = {
    color: 'red', 
    backgroundColor: 'black'
}

export default Header
