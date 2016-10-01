import declarity from 'declarity';

const {Entity, register} = declarity;

const rectFill = (props, {context}) => {
    context.fillStyle = "red";
}

class Rect extends Entity {
    didCreate = ({props}) => {
        const {context, color} = props;

        context.fillStyle = color;
        context.fillRect(25, 25, 100, 100);
        context.clearRect(45, 45, 60, 60);
        context.strokeRect(50, 50, 50, 50);
    }
}


class Canvas extends Entity {
    create = () => {
        const docRoot = document.getElementById('root');
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d');

        docRoot.appendChild(canvas);

        return {
            docRoot,
            canvas,
            context
        }
    }

    render = ({state}) => {
        return [
            <Rect
                key="rect-1"
                color="red"
                context={state.context}
                systems={[]}
            />
        ];
    }
}


class App extends Entity {
    render = () => {
        return <Canvas key="rootCanvas" />
    }
}


register(<App />);
