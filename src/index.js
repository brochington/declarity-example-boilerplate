import declarity from 'declarity'
import Staction from 'staction'

const {Entity, register} = declarity

const processSystems = (props) => {
    const {systems} = props

    if (Array.isArray(systems) && systems.length > 0) {
        return systems.reduce((acc, system) => {
            return typeof system == 'function'
                       ? system(acc)
                       : acc
        }, props)
    }

    return props
}

const clearAll = (props) => {
    props.context.clearRect(0, 0, 100, 100);

    return props;
}

const fillRect = (props) => {
    const {context, color, systems} = props
    context.fillStyle = color
    context.fillRect(25, 25, 100, 100)

    return props
}

const addClearBit = (props) => {
    const {context, systems, count} = props

    context.clearRect(45, 45, 60, 60)
    context.strokeRect(count, 50, 50, 50)

    return props
}

class Rect extends Entity {
    create = ({props}) => {
        return processSystems(props)
    }

    didCreate = ({props}) => {

    }

    update = ({props}) => {
        processSystems(props)
    }
}

class Canvas extends Entity {
    create = () => {
        const docRoot = document.getElementById('root')
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        docRoot.appendChild(canvas)

        return {
            docRoot,
            canvas,
            context
        }
    }

    render = ({state, props}) => {
        return [
            <Rect
                key="rect-1"
                color="orange"
                context={state.context}
                count={props.count}
                systems={[clearAll, fillRect, addClearBit]}
            />
        ]
    }
}


class App extends Entity {
    create = ({setState}) => {
        const initState = {count: 0}
        this.staction = new Staction();

        this.staction.init(
            {
                updateCount: (state, actions) => {
                    return {count: state().count + 1}
                }
            },
            () => initState,
            (newState) => {
                setState(newState)
            }
        )

        return initState
    }

    didCreate = ({state}) => {
        // setInterval(this.staction.actions.updateCount, 1000)
    }

    render = ({state}) => {
        return <Canvas key="rootCanvas" count={state.count}/>
    }
}


register(<App />)
