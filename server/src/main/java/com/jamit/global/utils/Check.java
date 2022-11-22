package com.jamit.global.utils;

import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;

public class Check {

    public static void checkAuthor(String authorEmail, String loginEmail) {
        if (!authorEmail.equals(loginEmail)) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        }
    }
}
