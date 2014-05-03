<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
	request.setCharacterEncoding("UTF-8");
	response.setHeader("Content-Type","application/force-download");
	response.setHeader("Content-Type","application/vnd.ms-excel");
	String fileName=request.getParameter("fileName")+".xls";
	response.setHeader("Content-Disposition","attachment;filename="+fileName);
	out.print(request.getParameter("exportContent")); 
%> 