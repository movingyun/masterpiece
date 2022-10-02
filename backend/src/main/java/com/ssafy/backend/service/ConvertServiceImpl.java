package com.ssafy.backend.service;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConvertServiceImpl implements ConvertService {

    @Override
    public String convert(String keyword) {
        final String url = "https://transliterator.herokuapp.com/#" + keyword;
        Connection conn = Jsoup.connect(url);
        Document document = null;
        try{
            document = conn.get();
            System.out.println(document);
        } catch (IOException e){
            e.printStackTrace();
        }

        List<String> list = new ArrayList<>();
        Element element = document.getElementById("output");
        System.out.println()

        String res = null;
        return res;
    }
}
