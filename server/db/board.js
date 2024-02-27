const boardList = 
`select 
        b.no,
        b.title,
        b.writer,
        b.content,
        b.created_date,
        b.updated_date,
        count(c.no) as comment
from t_board_board b left outer join t_comment_board c 
on b.no = c.bno 
group by b.no 
order by b.no`;

const boardInfo  =
`select 
        no,
        title,
        writer,
        content,
        created_date,
        updated_date, 
        (select count(no) from t_comment_board where bno = t_board_board.no) as comment 
from t_board_board 
WHERE no = ?`;

const boardInsert =
`INSERT INTO t_board_board 
SET ? `;

const boardUpdate = 
`UPDATE t_board_board 
SET ? 
WHERE no = ? `;

module.exports = {
    boardList,
    boardInfo,
    boardInsert,
    boardUpdate
}