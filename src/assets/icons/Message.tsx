function Message({ width = 24, height = 24, color = '#FC9E29' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 548.244 548.244"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852s9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88s11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
        fill={color}
      />
    </svg>
  );
}

export default Message;
