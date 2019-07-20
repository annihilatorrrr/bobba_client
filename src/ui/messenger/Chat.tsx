import React, { ChangeEvent } from 'react';
import WindowManager from "../windows/WindowManager";
import Draggable from 'react-draggable';
import './chat.css';

type ChatProps = {};
type ChatState = {
    visible: boolean,
    zIndex: number,
    text: string,
};
const initialState = {
    visible: true,
    zIndex: WindowManager.getNextZIndex(),
    text: '',
};

export default class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = initialState;
    }

    close = () => {
        this.setState({
            visible: false,
        });
    }

    upgradeZIndex = () => {
        this.setState({
            zIndex: WindowManager.getNextZIndex(),
        });
    }

    //TypeScript or React bug: KeyboardEvent is not a generic type
    handleKeyDown = (evt: any) => {
        const event = evt as KeyboardEvent;
        const isEnter = event.which === 13;
        if (isEnter) {
            event.preventDefault();
            this.setState({
                text: '',
            });
        }
    }

    handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            text: event.target.value,
        });
    }

    render() {
        const { visible, zIndex, text } = this.state;
        if (!visible) {
            return <></>;
        }
        return (
            <Draggable defaultClassName="chat" handle=".title" onStart={() => this.upgradeZIndex()} onMouseDown={() => this.upgradeZIndex()}>
                <div style={{ zIndex }}>
                    <button className="close" onClick={this.close}>
                        X
                    </button>
                    <h2 className="title">
                        Gravity
                    </h2>
                    <div className="main_tab_container">
                        <button className="arrow">
                            <img src="/images/messenger/prev.png" alt="" />
                        </button>
                        <button className="alert">
                            <img src="https://www.habbo.com/habbo-imaging/avatarimage?figure=hd-190-10.lg-3023-1408.ch-215-91.hr-893-45&direction=2&head_direction=2&size=s&headonly=1" alt="" />
                        </button>
                        <button className="selected">
                            <img src="https://www.habbo.com/habbo-imaging/avatarimage?figure=ca-1811-62.lg-3018-81.hr-836-45.ch-669-1193.hd-600-10&direction=2&head_direction=2&size=s&headonly=1" alt="" />
                        </button>
                        <button>
                            <img src="https://www.habbo.com/habbo-imaging/avatarimage?figure=ca-1811-62.lg-3018-81.hr-836-45.ch-669-1193.hd-600-10&direction=2&head_direction=2&size=s&headonly=1" alt="" />
                        </button>
                        <button>
                            <img src="https://www.habbo.com/habbo-imaging/avatarimage?figure=ca-1811-62.lg-3018-81.hr-836-45.ch-669-1193.hd-600-10&direction=2&head_direction=2&size=s&headonly=1" alt="" />
                        </button>
                        <button>
                            <img src="https://www.habbo.com/habbo-imaging/avatarimage?figure=ca-1811-62.lg-3018-81.hr-836-45.ch-669-1193.hd-600-10&direction=2&head_direction=2&size=s&headonly=1" alt="" />
                        </button>
                        <button className="arrow">
                            <img src="/images/messenger/next.png" alt="" />
                        </button>
                    </div>
                    <div className="actions_container">
                        <button>
                            <img src="/images/messenger/follow_friend.png" alt="Follow friend" />
                        </button>
                        <button className="close_chat">
                            <img src="/images/messenger/close.png" alt="Close" />
                        </button>
                    </div>
                    <div className="wrapper">
                        <p className="info">
                            Revelar tu contraseña o datos personales en Internet es peligroso. Por tu seguridad, un moderador podría supervisar tu conversación.
                        </p>
                        <p className="me">
                            3:50pm: hello ther, this is a very long chat line. idk what to write more
                        </p>
                        <p>
                            3:51pm: lol it actually works
                        </p>
                        <p className="info">
                            Tu amig@ se ha desconectado.
                        </p>
                    </div>

                    <form>
                        <textarea value={text} onKeyDown={this.handleKeyDown} onChange={this.handleChange} rows={2} cols={10}></textarea>
                    </form>
                </div>
            </Draggable>
        );
    }
}