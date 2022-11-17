
package com.jamit.jam.entity;

public enum Category {
	NEARBY("내주변"),
	ALL("전체"),
	HEALTH("운동/건강"),
	LIFESTYLE("라이프스타일"),
	COOK("요리"),
	ART("미술"),
	CAREER("커리어"),
	HANDCRAFT("공예"),
	MEDIA("사진/영상"),
	MUSIC("음악"),
	LANGUAGE("외국어"),
	EDUCATION("교육"),
	FINANCE("재테크"),
	BUSINESS("비즈니스"),
	DEVELOPMENT("개발");

	public final String category;

	 Category(String category) {
		this.category = category;
	}
}

