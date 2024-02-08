# Messages

Los componentes de mensaje son Componetes del cliente, por tanto las importaciones ya incluyen el `use client` para el framework Nexjs

### Template por defecto

Con Template por defecto.

```jsx
export const CustomAction = () => {
	const { push } = useMessage();

	const handleOnClick = () => {
		push({ message: "Mensaje de Error", type: "error" });
	};

	return <button onClick={handleOnClick}>Mensaje de Error</button>;
};

export const App = () => {
	return (
		<Messages>
			<h1>Messages Example</h1>
			<CustomAction />
		</Messages>
	);
};
```

Con Template Customizado

```jsx
export const CustomMessage = ({ data }: MessageTemplateProps<string>) => {
    return (
        <div className='custom-message'>
            <h1>{data}</h1>
        </div>
    );
};

export const CustomAction = () => {
    const { push } = useMessage<string>();

    const handleOnClick = () => {
        push("Mensaje de Error");
    };

    return <button onClick={handleOnClick}>Enviar Mensaje de Error</button>;
};

export const App = () => {
    return (
        <Messages  Template={CustomMessage}>
            <h1>Message Example</h1>
            <CustomAction />
        </Messages>
    );
};
```

## Estilos

Javascript/Typescript

```typescript
import "react-inekz/styles/variables.min.css";
import "react-inekz/styles/messages.min.css";
```

Css/Sass/Scss

```css
@import url("react-inekz/styles/variables.min.css");
@import url("react-inekz/styles/messages.min.css");
```
