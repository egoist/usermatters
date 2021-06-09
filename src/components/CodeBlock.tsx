import clsx from 'clsx'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

export const CodeBlock: React.FC<{ code: string; lang: Language }> = ({
  code,
  lang,
}) => {
  return (
    <Highlight {...defaultProps} code={code} language={lang} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(className, `p-5 rounded-lg overflow-auto`)}
          style={style}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
