import React, { useRef } from 'react'

import { noop } from 'lodash'

import { Chat as ChatUI, ChatUISubmitButtonProps, ChatUITextAreaProps } from  'devcode-ui/src/Chat'
import { FileLinkProps } from  'devcode-ui/src/chat/components/EnhancedContext'
import { SymbolLinkProps } from  'devcode-ui/src/chat/PreciseContext'
import { DEVCODE_TERMS_MARKDOWN } from  'devcode-ui/src/terms'
import { SubmitSvg } from  'devcode-ui/src/utils/icons'

import styles from './Chat.module.css'

export const Chat: React.FunctionComponent<
    Omit<
        React.ComponentPropsWithoutRef<typeof ChatUI>,
        | 'textAreaComponent'
        | 'submitButtonComponent'
        | 'fileLinkComponent'
        | 'symbolLinkComponent'
        | 'messageBeingEdited'
        | 'setMessageBeingEdited'
    >
> = ({
    messageInProgress,
    transcript,
    contextStatus,
    formInput,
    setFormInput,
    inputHistory,
    setInputHistory,
    onSubmit,
}) => (
    <ChatUI
        messageBeingEdited={false}
        setMessageBeingEdited={noop}
        messageInProgress={messageInProgress}
        transcript={transcript}
        contextStatus={contextStatus}
        formInput={formInput}
        setFormInput={setFormInput}
        inputHistory={inputHistory}
        setInputHistory={setInputHistory}
        onSubmit={onSubmit}
        textAreaComponent={TextArea}
        submitButtonComponent={SubmitButton}
        fileLinkComponent={FileLink}
        symbolLinkComponent={SymbolLink}
        afterMarkdown={DEVCODE_TERMS_MARKDOWN}
        transcriptItemClassName={styles.transcriptItem}
        humanTranscriptItemClassName={styles.humanTranscriptItem}
        transcriptItemParticipantClassName={styles.transcriptItemParticipant}
        transcriptActionClassName={styles.transcriptAction}
        inputRowClassName={styles.inputRow}
        chatInputClassName={styles.chatInput}
        isDevcodeEnabled={true}
    />
)

const TextArea: React.FunctionComponent<ChatUITextAreaProps> = ({
    className,
    rows,
    autoFocus,
    value,
    required,
    onInput,
    onKeyDown,
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
        if (onKeyDown) {
            onKeyDown(event, textAreaRef.current?.selectionStart ?? null)
        }
    }

    return (
        <textarea
            ref={textAreaRef}
            className={className}
            rows={rows}
            value={value}
            autoFocus={autoFocus}
            required={required}
            onInput={onInput}
            onKeyDown={handleKeyDown}
        />
    )
}

const SubmitButton: React.FunctionComponent<ChatUISubmitButtonProps> = ({ className, disabled, onClick }) => (
    <button className={className} type="submit" disabled={disabled} onClick={onClick}>
        <SubmitSvg />
    </button>
)

const FileLink: React.FunctionComponent<FileLinkProps> = ({ path }) => <>{`@${path}`}</>
const SymbolLink: React.FunctionComponent<SymbolLinkProps> = ({ symbol }) => <>{symbol}</>
