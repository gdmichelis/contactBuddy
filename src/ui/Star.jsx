function Star({ favorite }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path
        d="m4.178 20.801 6.758-4.91 6.756 4.91-2.58-7.946 6.758-4.91h-8.352L10.936 0 8.354 7.945H0l6.758 4.91-2.58 7.946z"
        fill={`${favorite === false ? "transparent" : "yellow"}`}
        stroke={`${favorite === false ? "#ccc" : "#ccc"}`}
      />
    </svg>
  );
}

export default Star;
